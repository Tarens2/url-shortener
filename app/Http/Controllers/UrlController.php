<?php

namespace App\Http\Controllers;

use App\Url;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class UrlController extends Controller
{
    protected static $chars = "123456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";

    function addUrl(Request $request)
    {
        $reqUrl = $request->input('url');
        $url = Url::where('url', $reqUrl)->first();
        if (count($url) == 0) {
            $newUrl = new Url(['url' => $reqUrl]);
            $newUrl->save();
            $urlShorted = $this->convertById($newUrl->id);
            $newUrl->update(['url_shorted' => $urlShorted]);
            return response()->json(['url' => $newUrl]);
        } else {
            return response()->json(['url' => $url]);
        }
    }

    function redirectUrl($url_shorted)
    {
        $url = Url::where('url_shorted', $url_shorted)->first();

        if(count($url) == 0) {
            return redirect('/');
        } else {
            $url->counter++;
            $url->save();
            return redirect()->away($url->url);
        }
    }

    protected function convertById($id)
    {
        $length = strlen(self::$chars);
        $code = "";
        while ($id > $length - 1) {
            $code = self::$chars[intval(fmod($id, $length))] . $code;
            $id = floor($id / $length);
        }
        $code = self::$chars[intval($id)] . $code;
        return $code;
    }


}
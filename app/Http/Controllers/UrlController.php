<?php

namespace App\Http\Controllers;

use App\Url;
use Illuminate\Http\Request;

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
            return response()->json(['url_shorted' => $urlShorted, 'url' => $reqUrl]);
        } else {
            return response()->json(['url_shorted' => $url->url_shorted, 'url' => $reqUrl]);
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
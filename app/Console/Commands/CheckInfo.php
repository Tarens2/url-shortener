<?php

namespace App\Console\Commands;

use App\Url;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CheckInfo extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'CheckInfo:deleting';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deleting 15 days urls';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        Url::where('created_at', '>=', Carbon::now()->subDays(15)->toDateTimeString())->delete();
    }
}
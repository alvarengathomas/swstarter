<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\StarWarsController;

class ComputeStatistics extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'statistics:compute';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Compute and cache search statistics';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Computing search statistics...');
        
        $controller = new StarWarsController();
        $controller->computeStatistics();
        
        $this->info('Statistics computed and cached successfully.');
        
        return Command::SUCCESS;
    }
}

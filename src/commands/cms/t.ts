import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer';
const Listr = require('listr');

import Questions from "../../libraries/Questions";
import Generator from "../../libraries/Generator";
import Functions from '../../libraries/Functions'


const chalk = require('chalk');
const log = console.log;


export default class CmsT extends Command {

  questions: {[k: string]: any} = {};
  inputs: {[k: string]: any} = {};


  static description = 'To generate theme for VaahCMS';


  /*
   *---------------------------------------------------
   * Command Flags/Options
   *---------------------------------------------------
   */
  static flags = {
    help: flags.help({char: 'h'}),
    name: flags.help({char: 'n'}),
    force: flags.boolean({char: 'f'}),
  };


  /*
   *---------------------------------------------------
   * Command Arguments
   *---------------------------------------------------
   */
  static args = [];


  /*
   *---------------------------------------------------
   * Command Execution
   *---------------------------------------------------
   */

  async run() {

    let functions = new Functions();
    let is_updates_available = await functions.isUpdatesAvailable();
    if(is_updates_available)
    {
      return true;
    }

    const {args, flags} = this.parse(CmsT);

    let questions = new Questions();

    this.inputs = await inquirer.prompt(questions.getVaahCmsThemeQuestions());

    this.inputs['webpack_port'] = functions.generateRandom(8000, 8999);

    this.inputs['namespace'] = 'VaahCms\\Themes\\'+this.inputs.theme_name;
    this.inputs['service_provider_name'] = this.inputs.theme_name+'ServiceProvider.php';

    this.inputs['year'] = (new Date()).getFullYear();

    let source = '\\skeletons\\vaahcms\\theme\\';
    let target = "./VaahCms/Themes/"+this.inputs.theme_name;

    let generator = new Generator(args, flags, this.inputs, source, target);


    log(chalk.green('======================================='));
    log('Generating Theme: '+chalk.green(this.inputs.theme_name));
    log(chalk.green('---------------------------------------'));


    const tasks = new Listr([
      {
        title: 'Files Generated',
        task: function () {
          generator.files();

        }
      }
    ]);


    tasks.run().then((ctx: any) => {
      log(chalk.green('======================================='));
    }).catch((err: any) => {
      console.error(err);
    });


  }
}

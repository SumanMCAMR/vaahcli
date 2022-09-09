<?php namespace VaahCms\Modules\HelloWorld\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class BackendController extends Controller
{


    public function __construct()
    {

    }

    public function index(Request $request)
    {


        /**
         * Check user has permission else redirect
         */
        /*
        $permission_slug = 'has-access-helloworld';
        if(!\Auth::user()->hasPermission($permission_slug))
        {
            $error_message = trans("vaahcms::messages.permission_denied");
            if(env('APP_DEBUG'))
            {
                $error_message .= ' Permission Slug: '.$permission_slug;
            }
            $response['errors'][] = $error_message;
            return redirect('vh.backend')->withErrors($response['errors']);
        }
        */

        return view('helloworld::backend.pages.index');

        // Use following blade file to use vue app
        //return view('helloworld::backend.pages.app');
    }

    public function getAssets(Request $request)
    {

        /**
         * Check user has permission else return permission denied error
         */

        /*
        $permission_slug = 'has-access-helloworld';
        if(!\Auth::user()->hasPermission($permission_slug))
        {
            $response['status'] = 'failed';
            $error_message = trans("vaahcms::messages.permission_denied");
            if(env('APP_DEBUG'))
            {
                $error_message .= ' Permission Slug: '.$permission_slug;
            }
            $response['errors'][] = $error_message;
            return response()->json($response);
        }
        */

        $data=[];

        $data['module'] = [
            'name' => config('helloworld.name'),
            'version' => config('helloworld.version')
        ];

        $data['timezone'] = env("APP_TIMEZONE");
        $data['server_date_time'] = \Carbon::now();

        $response['success'] = true;
        $response['data'] = $data;

        return response()->json($response);

    }

}

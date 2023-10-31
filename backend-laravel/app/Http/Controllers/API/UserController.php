<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    
    public function viewProfile($id){
        
        $user = User::find($id);
        $roles = $user->getRoleNames()->toArray();

        // You can now perform actions based on the user's role(s)
        if (in_array('b2c', $roles)) {
            // User is an Admin
            $roleMessage = 'B2C';
            // Add more actions specific to Admins if needed
        } elseif (in_array('b2b', $roles)) {
            // User is a B2C customer
            $roleMessage = 'B2B Customer';
            // Add more actions specific to B2C customers if needed
        } else {
            // Handle other roles or scenarios
            $roleMessage = 'Role Not Defined';
        }

        if ($user) {
            return response()->json([
                'user' => $user,
                'role'=>$roles
            ]);
        }

        return response()->json([
            'error' => 'No user found'
        ]);
        
    }
    
    public function viewUser()
    {
        
    
    $usersWithoutAdminRole = User::whereDoesntHave('roles', function ($query) {
        $query->where('name', 'admin');
    })->with('roles:name')->get();

    if ($usersWithoutAdminRole->isNotEmpty()) {
        $userRoleData = [];

        foreach ($usersWithoutAdminRole as $user) {
            $userRoles = $user->roles->pluck('name')->toArray();
            $userRoleData[] = [
                'user' => $user,
                'roles' => $userRoles,
            ];
        }

        return response()->json(['users' => $userRoleData]);
    }

    return response()->json(['error' => 'No users with roles other than admin found']);

        // $user = User::all();

        // if ($user->isNotEmpty()) {
        //     return response()->json([
        //         'users' => $user,
        //     ]);
        // }

        // return response()->json([
        //     'error' => 'No user found'
        // ]);
    }

    public function cancelUserAccess($id)
    {


        $user = User::find($id);

        if ($user) {
            $user->status = 0;
            $user->update();

            return response()->json([
                'error' => 'User Access Revoked'
            ]);
        }

        return response()->json([
            'error' => 'No user found'
        ]);
    }

    public function activateUserAccess($id)
    {


        $user = User::find($id);

        if ($user) {
            $user->status = 1;
            $user->update();

            return response()->json([
                'error' => 'User Access Granted'
            ]);
        }

        return response()->json([
            'error' => 'No user found'
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return TaskResource::collection(Task::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::user()->id;
        // $data['created_at'] = now();
        info($data);
        info(Auth::user()->id);
        $task = Task::create([
            'description' => $data['description'],
            'created_by' => Auth::user()->id,
            'status' => $data['status'],
            'title'=> $data['title'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response(new TaskResource($task), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Task $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        // info("Inside here");
        return new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateTaskRequest $request
     * @param \App\Models\Task                     $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        // Validate the request
        $data = $request->validated();
        $data['created_by'] = Auth::user()->id;

        // Log for debugging
        info($data);
        info(Auth::user()->id);

        // Update the existing task
        $task->update([
            'description' => $data['description'],
            'status' => $data['status'],
            'title'=> $data['title'],
        ]);

        // Return the updated task resource
        return response(new TaskResource($task), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return response("", 204);
    }
}

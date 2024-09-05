<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $created_by = User::where('id',$this->created_by)->first();
        return [
            'task_id' => $this->id,
            'description' => $this->description,
            'title'=>$this->title,
            'created_by' => $this->created_by,
            'status' => $this->status,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'created_by_name'=> $created_by->name
        ];
    }
}

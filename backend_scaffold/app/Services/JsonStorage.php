<?php

namespace App\Services;

use Illuminate\Filesystem\Filesystem;

class JsonStorage
{
    protected $path;
    protected $fs;

    public function __construct(Filesystem $fs)
    {
        $this->fs = $fs;
        $this->path = storage_path('app/users.json');
        if (! $this->fs->exists($this->path)) {
            $this->fs->put($this->path, json_encode([]));
        }
    }

    public function all()
    {
        $json = $this->fs->get($this->path);
        return json_decode($json, true) ?: [];
    }

    public function find($id)
    {
        $users = $this->all();
        return $users[$id] ?? null;
    }

    public function create(array $data)
    {
        $users = $this->all();
        $id = $this->nextId($users);
        $data['id'] = $id;
        $users[$id] = $data;
        $this->fs->put($this->path, json_encode($users, JSON_PRETTY_PRINT));
        return $data;
    }

    public function update($id, array $data)
    {
        $users = $this->all();
        if (!isset($users[$id])) return null;
        $data['id'] = $id;
        $users[$id] = $data;
        $this->fs->put($this->path, json_encode($users, JSON_PRETTY_PRINT));
        return $data;
    }

    public function delete($id)
    {
        $users = $this->all();
        if (!isset($users[$id])) return false;
        unset($users[$id]);
        $this->fs->put($this->path, json_encode($users, JSON_PRETTY_PRINT));
        return true;
    }

    protected function nextId(array $users)
    {
        if (empty($users)) return 1;
        $ids = array_map('intval', array_keys($users));
        return max($ids) + 1;
    }
}

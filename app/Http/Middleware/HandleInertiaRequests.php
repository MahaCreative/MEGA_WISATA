<?php

namespace App\Http\Middleware;

use App\Models\Informasi;
use App\Models\Kategori;
use App\Models\Profil;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        $profileWisata = Profil::first();
        $newPost = Informasi::latest()->get()->take(5);
        return [
            ...parent::share($request),
            'profileWisata' => $profileWisata,
            'newPost' => $newPost,
            'kategori' => Kategori::all(),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'type' => $request->session()->get('type'),
                'message' => $request->session()->get('message'),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}

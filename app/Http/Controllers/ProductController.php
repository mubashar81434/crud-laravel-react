<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Product;

class ProductController extends Controller
{
    public function index(){
        $products = Product::all();
        return Inertia::render('Products/Index',compact('products'));
    }

    public function create(){
        return Inertia::render('Products/Create',[]);
    }

    public function store(Request $request){
        // dd($req);
        $request->validate([
            'name'=>'required|string|max:255',
            'price'=>'required|numeric',
            'description'=>'string|nullable',
        ]);

        Product::create($req->all()) ;
        return redirect()->route('products.index')->with('message','Product created successfully');
    }

    public function edit(Product $product){

        return inertia::render('Products/Edit', compact('product'));

    }

    public function update(Request $request, Product $product){
    $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'description' => 'string|nullable',
    ]);

    $product->update([
        'name' => $request->input('name'),
        'price' => $request->input('price'),
        'description' => $request->input('description'),
    ]);

    return redirect()->route('products.index')->with('message', 'Product updated successfully');
}


    public function destroy(Product $product){
        $product->delete();
        return redirect()->route('products.index')->with('message', 'product deleted succesfully');
    }
}

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Input } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a new product',
        href: '/products/create',
    },
];

export default function Index() {

    const { data, setData, post, processing, errors } = useForm({
        name: 'apple',
        price: '2',
        description: 'apple description',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(data)
        post(route('products.store'));
    };

    return (

        <AppLayout breadcrumbs={breadcrumbs}>

            <Head title="Products" />

            <div className="w-8/12 p-4">
                <form action="" onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="product name">Name</Label>
                        <Input
                            placeholder="Product name"
                            className={'rounded-md border p-2'}
                            value={data.name}
                            onChange={(e) => {
                                setData('name', e.target.value);
                            }}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="product price">Price</Label>
                        <Input
                            placeholder="Product price"
                            className={'rounded-md border p-2'}
                            value={data.price}
                            onChange={(e) => {
                                setData('price', e.target.value);
                            }}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="product description">Description</Label>
                        <Textarea
                            placeholder="Product description"
                            className={'rounded-md border p-2'}
                            value={data.description}
                            onChange={(e) => {
                                setData('description', e.target.value);
                            }}
                        />
                    </div>
                    <Button type="submit">Add Product</Button>
                </form>
            </div>

        </AppLayout>

    );
    
}

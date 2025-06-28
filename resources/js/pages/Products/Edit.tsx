import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
import React from 'react';

// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Edit a  product',
//         href: '/products/edit',
//     },
// ];

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

interface Props {
    product: Product;
}

export default function Edit({ product }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        description: product.description,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(data)
        put(route('products.update', product.id));
    };

    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'Edit a product',
                    href: `/products/${product.id}/edit`,
                },
            ]}
        >
            <Head title="Edit a Product" />

            <div className="w-8/12 p-4">
                <form action="" onSubmit={handleUpdate} className="flex flex-col gap-3">
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert />
                            <AlertTitle>Errors!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
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
                    <Button type="submit">Update Product</Button>
                </form>
            </div>
        </AppLayout>
    );
}

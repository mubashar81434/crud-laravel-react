import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input'; // ✅ Correct import
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
import React from 'react';

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
            <Head title="Edit Product" />

            <div className="w-8/12 p-4">
                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Validation Errors</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc list-inside space-y-1">
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="Product name"
                            className="rounded-md border p-2"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            placeholder="Product price"
                            type="number"
                            className="rounded-md border p-2"
                            value={data.price}
                            onChange={(e) => setData('price', Number(e.target.value))}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Product description"
                            className="rounded-md border p-2"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing ? 'Updating...' : 'Update Product'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}

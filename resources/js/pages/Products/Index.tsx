import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { BellRing } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}
interface PageProps {
    flash: {
        message?: string;
    };
    products: Product[];
}



export default function Index() {

    const { flash, products } = usePage().props as PageProps;
    const {processing, delete:destroy} = useForm();

    const handleDelete = (id:number, name:string)=>{

    if(confirm(`Do you want to delete`)){
        destroy(`/products/${id}`)       
    }
}
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="m-4">
                <Link href={route('products.create')}>
                    <Button>Create product</Button>
                </Link>
            </div>
            <div>
                {flash.message && (
                    <Alert>
                        <BellRing />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}
            </div>
            {products.length > 0 && (
                <Table>
                    <TableCaption>A list of your recent product.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product, key) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell className="">{product.description}</TableCell>
                                <TableCell className="">
                                    <Button disabled={processing} onClick={()=>handleDelete(product.id, product.name)} >Delete</Button>
                                  <Link  href={route('products.edit',product.id)}><Button>Edit</Button></Link>  
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </AppLayout>
    );
}

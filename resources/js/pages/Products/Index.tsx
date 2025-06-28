import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  const { processing, delete: destroy } = useForm();

  // ✅ Safe assertion from usePage().props
  const { flash, products } = usePage().props as unknown as PageProps;

  const handleDelete = (id: number) => {
    if (confirm('Do you want to delete this product?')) {
      destroy(`/products/${id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />

      <div className="m-4">
        <Link href={route('products.create')}>
          <Button>Create Product</Button>
        </Link>
      </div>

      {flash.message && (
        <Alert>
          <BellRing />
          <AlertTitle>Notification</AlertTitle>
          <AlertDescription>{flash.message}</AlertDescription>
        </Alert>
      )}

      {products.length > 0 && (
        <Table>
          <TableCaption>A list of your recent products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Button
                    variant="destructive"
                    disabled={processing}
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                  <Link href={route('products.edit', product.id)}>
                    <Button>Edit</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </AppLayout>
  );
}

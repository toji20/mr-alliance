'use client'

import React from 'react';
import { AdminCatalogCard } from './admin-catalog-card';
import { House } from '@prisma/client';
import { forceDeleteProduct } from '@/app/api/actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useCatalog } from '@/contexts/catalog-context';

interface Props {
    className?: string;
}

export const AdminGroupCard:React.FC<Props> = ({
}) => {
    const { items } = useCatalog()
    const router = useRouter()
    const handleDelete = async (productId: number) => {
        const confirmation = confirm('Вы уверены, что хотите удалить этот товар?');
        if (!confirmation) return;

        const result = await forceDeleteProduct(productId);
        
        if (result.success) {
            toast.success('Товар успешно удален');
            router.refresh();
        } else {
            toast.error('Ошибка при удалении');
        }
    };
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items?.map((item, id) => (
                      <AdminCatalogCard
                        onClickRemove={() => handleDelete(item.id)}
                        key={id}
                        name={item.name}
                        image={item.imageUrl}
                        price={item.price}
                        size={item.size}
                        features={item.features}
                        descr={item.descr as string}
                      />
                    ))}
                  </div>
    )
};
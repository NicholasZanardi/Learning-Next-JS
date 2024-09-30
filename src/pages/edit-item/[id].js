import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ItemForm from '../../components/ItemForm';

export default function EditItem() {
  const [existingItem, setExistingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/items/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch item');
          }
          return res.json();
        })
        .then((data) => {
          setExistingItem(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return existingItem ? (
    <ItemForm isEdit={true} existingItem={existingItem} />
  ) : (
    <div>Item not found</div>
  );
}

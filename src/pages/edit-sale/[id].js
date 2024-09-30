import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SaleForm from '../../components/SaleForm';

export default function EditSale() {
  const [existingSale, setExistingSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/sales/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch sale');
          }
          return res.json();
        })
        .then((data) => {
          setExistingSale(data);
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

  return existingSale ? (
    <SaleForm isEdit={true} existingSale={existingSale} />
  ) : (
    <div>Sale not found</div>
  );
}

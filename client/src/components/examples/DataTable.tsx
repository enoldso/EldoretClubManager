import DataTable from '../DataTable';
import { Badge } from '@/components/ui/badge';

export default function DataTableExample() {
  const columns = [
    { key: 'id', label: 'Booking ID' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'caddie', label: 'Caddie' },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => {
        const variants: Record<string, any> = {
          Confirmed: 'default',
          Pending: 'secondary',
          Cancelled: 'destructive'
        };
        return <Badge variant={variants[value]}>{value}</Badge>;
      }
    }
  ];

  const data = [
    { id: 'BK-001', date: 'Mar 15, 2025', time: '09:00 AM', caddie: 'James Kipchoge', status: 'Confirmed' },
    { id: 'BK-002', date: 'Mar 18, 2025', time: '10:00 AM', caddie: 'Peter Kimutai', status: 'Pending' },
    { id: 'BK-003', date: 'Mar 20, 2025', time: '02:00 PM', caddie: 'Michael Ruto', status: 'Confirmed' },
    { id: 'BK-004', date: 'Mar 12, 2025', time: '11:00 AM', caddie: 'David Korir', status: 'Cancelled' }
  ];

  const actions = [
    { icon: 'view' as const, label: 'View', onClick: (row: any) => console.log('View:', row) },
    { icon: 'edit' as const, label: 'Edit', onClick: (row: any) => console.log('Edit:', row) },
    { icon: 'delete' as const, label: 'Delete', onClick: (row: any) => console.log('Delete:', row) }
  ];

  return (
    <div className="p-6 max-w-6xl">
      <DataTable
        title="Recent Bookings"
        description="Manage your tee time reservations"
        columns={columns}
        data={data}
        actions={actions}
      />
    </div>
  );
}

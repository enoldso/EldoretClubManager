import BookingCalendar from '../BookingCalendar';

export default function BookingCalendarExample() {
  return (
    <div className="p-6 max-w-4xl">
      <BookingCalendar onSelectSlot={(date, time) => console.log('Slot selected:', date, time)} />
    </div>
  );
}

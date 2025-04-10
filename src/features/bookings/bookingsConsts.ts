// export const bookingTableOperationsValues = {
//   'all': 'All',
//   'checked-in': 'Checked in',
//   'checked-out': 'Checked out',
//   'unconfirmed': 'Unconfirmed'
// }
export const bookingTableOperationsValues = [
  { value: "all", label: "All" },
  { value: "unconfirmed", label: "Unconfirmed" },
  { value: "checked-in", label: "Checked in" },
  { value: "checked-out", label: "Checked out" },
]

export const bookingSortOptions = [
  { value: "startDate-desc", label: "Sort by date (recent first)" },
  { value: "startDate-asc", label: "Sort by date (earlier first)" },
  { value: "totalPrice-desc", label: "Sort by amount (high first)",},
  { value: "totalPrice-asc", label: "Sort by amount (low first)" },
]


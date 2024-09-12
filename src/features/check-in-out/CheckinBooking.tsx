// import styled from "styled-components";
import {BookingDataBox} from "../bookings/BookingDataBox.tsx";
import {Row} from "@/ui/Row";
import {Heading} from "@/ui/Heading.js";
import {ButtonGroup} from "@/ui/ButtonGroup.js";
import {Button} from "@/ui/Button.tsx";
import {ButtonText} from "@/ui/ButtonText.js";
import { useMoveBack } from "@/hooks/useMoveBack.js";
import {useBooking} from "@/features/bookings/useBooking.ts";
import {Spinner} from "@/ui/Spinner.tsx";

// const Box = styled.div`
//   /* Box */
//   background-color: var(--color-grey-0);
//   border: 1px solid var(--color-grey-100);
//   border-radius: var(--border-radius-md);
//   padding: 2.4rem 4rem;
// `;

export const CheckInBooking = () => {
  const moveBack = useMoveBack();
  const {booking, isLoading} = useBooking()

  const handleCheckin = () => {
    //Todo
    console.log('check in')
  }

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking?.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button onClick={handleCheckin}>Check in booking #{booking?.id}</Button>
        <Button  $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}


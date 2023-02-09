import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import { getAllReservations } from '../../redux/reservations/reservations';
import './reservation.css';

const Reservation = ({ userId }) => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations);

  useEffect(() => {
    if (!reservations.length) {
      dispatch(getAllReservations(userId));
    }
  }, [dispatch, userId]);

  console.log(reservations);

  return (
    <section>
      {reservations?.map((reservation) => (
        <div key={reservation.id} className="reserve-cover">
          <Card key={reservation.id} className="reserve-cont">
            <CardMedia
              sx={{ height: 200 }}
              image={reservation.technician.image}
              title={reservation.technician.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" className="reserve-name">
                <Link to={`/technician/${reservation.technician.id}`}>
                  {reservation.technician.name}
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date:
                {' '}
                {reservation.date}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Charges:
                {' '}
                $
                {reservation.technician.charges}
              </Typography>
              <Typography>
                Location:
                {' '}
                {reservation.location}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" className="btn-appointment">
                Remove
              </Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </section>
  );
};

export default Reservation;

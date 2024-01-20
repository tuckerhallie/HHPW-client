import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <p> {user.username}</p>
      <Link href="orders/new" passHref>
        <Button style={{ backgroundColor: '#023e8a', marginBottom: '30px', marginTop: '20px' }}>Create New Order</Button>
      </Link>
      <Link href="orders" passHref>
        <Button style={{ backgroundColor: '#023e8a', marginBottom: '30px', marginTop: '20px' }}>View All Orders</Button>
      </Link>

    </div>
  );
}

export default Home;

import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

export const Realizations = () => {
  const navigate = useNavigate();

  return (
    <article className="grid grid-cols-4 gap-5 bg-orange-50 p-16">
      <div className="group grid cursor-pointer grid-rows-[3fr_1fr_1fr] overflow-hidden bg-white">
        <img src="/src/assets/ready1.jpeg" className="h-full object-cover transition duration-500 group-hover:scale-110" alt="ready-house" />
        <p className="flex items-center justify-center p-1 text-center uppercase">Dom całoroczny 145m2</p>
        <Button variant="link" className="group-hover:underline" onClick={() => navigate('/realizations')}>
          Więcej
        </Button>
      </div>
      <div className="group grid cursor-pointer grid-rows-[3fr_1fr_1fr] overflow-hidden bg-white">
        <img src="/src/assets/ready2.jpeg" className="h-full object-cover transition duration-500 group-hover:scale-110" alt="ready-house" />
        <p className="flex items-center justify-center p-1 text-center uppercase">Dom całoroczny 150m2</p>
        <Button variant="link" className="group-hover:underline" onClick={() => navigate('/realizations')}>
          Więcej
        </Button>
      </div>
      <div className="group grid cursor-pointer grid-rows-[3fr_1fr_1fr] overflow-hidden bg-white">
        <img src="/src/assets/ready3.jpeg" className="h-full object-cover transition duration-500 group-hover:scale-110" alt="ready-house" />
        <p className="flex items-center justify-center p-1 text-center uppercase">Dom całoroczny 190m2</p>
        <Button variant="link" className="group-hover:underline" onClick={() => navigate('/realizations')}>
          Więcej
        </Button>
      </div>
      <Button className="bg-custom-tertiary hover:bg-custom-ninth self-center" onClick={() => navigate('/realizations')}>
        Więcej gotowych realizacji
      </Button>
    </article>
  );
};

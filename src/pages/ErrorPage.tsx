import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import detective from '@/assets/detective.png';

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-screen items-center bg-cream">
      <div className="shell grid items-center gap-10 px-6 py-20 sm:grid-cols-2 lg:px-12">
        <article className="order-2 flex animate-fadeUp flex-col items-start gap-5 opacity-0 sm:order-1">
          <span className="eyebrow">Ups…</span>
          <h1 className="text-4xl font-normal leading-[1.1] sm:text-5xl">
            Wystąpił błąd
            <br />
            <em className="not-italic text-brand">lub strony tu nie ma</em>
          </h1>
          <p className="max-w-sm text-sm font-light leading-relaxed text-ink/60">
            Wygląda na to, że nie mamy tego, czego szukasz. Wróć na stronę główną albo zajrzyj do naszych realizacji.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="group inline-flex h-[3.25rem] items-center gap-3 rounded-full bg-brand px-8 text-sm font-semibold text-white shadow-brand transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
              Wróć do strony głównej
            </button>
            <button
              type="button"
              onClick={() => navigate('/realizacje')}
              className="inline-flex h-[3.25rem] items-center rounded-full border border-ink/15 px-8 text-sm font-semibold text-ink transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-brand hover:text-brand"
            >
              Nasze realizacje
            </button>
          </div>
        </article>

        <aside className="order-1 flex justify-center sm:order-2">
          <img src={detective} alt="" aria-hidden className="h-auto w-full max-w-sm object-contain opacity-90" />
        </aside>
      </div>
    </section>
  );
};

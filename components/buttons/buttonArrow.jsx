import Image from 'next/image';
import Link from 'next/link';
import Arrow from '@/public/assets/arrow.svg'



export default function ButtonArrow({ href, texto}) {

  return (
    <Link href={href} className="button">
      <span>{texto}</span>
      <Image
        src={Arrow}
        alt="flecha del botón"
        width={24}
        height={24}
        className="button__arrow"
        priority
      />
    </Link>
  );
}

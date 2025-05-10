import React, { useState } from 'react';
import Link from 'next/link';


function IndexSlider({ pais, modelos, nuevas, modeloslink, nuevaslink, isExpanded, onToggle }) {
    return (
      <button className="slider__master" onClick={onToggle} aria-expanded={isExpanded}>
        <div>
          <h3>{pais}</h3>
          <div className={`slider__item-content ${isExpanded ? 'expanded' : ''}`}>
            {modeloslink && <Link href={modeloslink}>{modelos}</Link>}
            {nuevaslink && <Link href={nuevaslink}>{nuevas}</Link>}
          </div>
        </div>
      </button>
    );
  }
  

export default IndexSlider;

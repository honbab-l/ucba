import React, { useState } from 'react';
import { characters } from './data';

const ImagePlaceholder = ({ src, className = '', alt, bgColor = 'bg-gray-200' }: { src: string, className?: string, alt?: string, bgColor?: string }) => {
  const isPlaceholder = src.startsWith('■') && src.endsWith('■');
  
  if (isPlaceholder) {
    return (
      <div className={`flex items-center justify-center text-center p-2 text-white text-sm font-bold break-all w-full h-full ${bgColor} ${className}`}>
        {src}
      </div>
    );
  }

  return <img src={src} alt={alt} className={`w-full h-full object-contain ${className}`} />;
};

const Decorations = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-20 right-[5%] md:right-[10%] w-48 md:w-64">
      <ImagePlaceholder src="https://i.postimg.cc/CLG3hXTD/bg5.png" bgColor="bg-pink-400" />
    </div>
    <div className="absolute bottom-40 left-[2%] md:left-[5%] w-40 md:w-56">
      <ImagePlaceholder src="https://i.postimg.cc/pTCV4rW9/bg3.png" bgColor="bg-blue-400" />
    </div>
    <div className="absolute top-1/2 right-[2%] w-44 md:w-60">
      <ImagePlaceholder src="https://i.postimg.cc/W4rvL3nJ/bg1.png" bgColor="bg-yellow-400" />
    </div>
    <div className="hidden md:block absolute top-0 right-10 w-48">
      <ImagePlaceholder src="https://i.postimg.cc/qRtfp74f/bg4.png" bgColor="bg-green-400" />
    </div>
  </div>
);

const CharacterCard = ({ char }: { char: any }) => {
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const handleElementClick = (element: string) => {
    if (activeElement === element) {
      setActiveElement(null);
    } else {
      setActiveElement(element);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto aspect-[2/3] my-24 md:my-32">
      {/* Backdrop for active element */}
      {activeElement && (
        <div 
          className="fixed inset-0 z-[90] bg-black/60 transition-opacity" 
          onClick={() => setActiveElement(null)} 
        />
      )}

      {/* Black Box (Student ID) */}
      <div 
        className={`transition-all duration-300 cursor-pointer ${
          activeElement === 'studentId' 
            ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-[min(90vw,54vh)] max-w-[600px] aspect-[674/1060] rotate-0' 
            : 'absolute top-[10%] -left-[5%] w-[80%] aspect-[674/1060] z-0 -rotate-12 hover:scale-105'
        }`}
        onClick={() => handleElementClick('studentId')}
      >
        <ImagePlaceholder src={char.studentIdImage} bgColor="bg-black" />
      </div>

      {/* Blue Box (Background Note) */}
      <div className="absolute inset-0 z-10">
        <div className="w-full h-full relative">
          <ImagePlaceholder src={char.bgNoteImage} bgColor="bg-blue-600" />
        </div>
      </div>

      {/* 4 Polaroids (No wrapper to avoid stacking context issues) */}
      {[char.image1, char.image2, char.image3, char.image4].map((imgSrc, idx) => {
        const id = `polaroid-${idx}`;
        const isActive = activeElement === id;
        const rotations = ['-rotate-6', '-rotate-2', 'rotate-2', 'rotate-6'];
        const offsets = ['-ml-6', '-ml-2', 'ml-2', 'ml-6'];
        const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-400', 'bg-green-500'];

        const descriptions = [char.image1Desc, char.image2Desc, char.image3Desc, char.image4Desc];

        return (
          <div 
            key={id}
            className={`cursor-pointer transition-all duration-300 bg-white p-2 pb-4 flex flex-col ${
              isActive 
                ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-[min(90vw,63vh)] max-w-[500px] aspect-[3/4] rotate-0' 
                : `absolute -top-[25%] left-1/2 w-[70%] aspect-[3/4] -translate-x-1/2 ${rotations[idx]} ${offsets[idx]} hover:scale-105`
            }`}
            style={{ zIndex: isActive ? 100 : 30 + idx }}
            onClick={() => handleElementClick(id)}
          >
            <div className="flex-1 relative overflow-hidden">
              <ImagePlaceholder src={imgSrc} bgColor={colors[idx]} />
            </div>
            <div className={`mt-2 text-center font-handwriting text-gray-800 flex flex-col justify-center ${isActive ? 'h-24' : 'h-12'}`}>
              {isActive ? (
                <>
                  <div className="text-3xl md:text-4xl">{char.englishName}</div>
                  <div className="text-lg md:text-xl mt-1 text-gray-600">{descriptions[idx]}</div>
                </>
              ) : (
                <div className="text-xl">{char.englishName}</div>
              )}
            </div>
          </div>
        );
      })}

      {/* Purple Box (Sticker) */}
      <div className="absolute top-[50%] -right-[15%] w-[60%] aspect-[3/2] z-40 pointer-events-none rotate-12">
        <ImagePlaceholder src={char.stickerImage} bgColor="bg-purple-600" />
      </div>

      {/* Grey Box (Sticker 2) */}
      <div className="absolute bottom-[5%] left-[5%] w-[45%] aspect-square z-40 pointer-events-none -rotate-6">
        <ImagePlaceholder src={char.sticker2Image} bgColor="bg-gray-400" />
      </div>
    </div>
  );
};

export default function App() {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return (
      <div className="min-h-screen custom-bg flex items-center justify-center p-4 relative overflow-hidden">
        {/* ■시작쪽지 위치■ (아래 src 안에 시작 화면에 띄울 이미지 주소를 넣으세요) */}
        <img 
          src="https://i.postimg.cc/rsJDcgqb/main.png" 
          alt="Start Note" 
          className="w-80 md:w-96 object-contain cursor-pointer"
          onClick={() => setEntered(true)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen custom-bg p-4 md:p-12 overflow-x-hidden relative">
      <Decorations />

      <header className="max-w-7xl mx-auto mb-16 md:mb-24 mt-8 relative z-10 flex justify-center">
        <div className="w-[350px]">
          <ImagePlaceholder src="https://i.postimg.cc/xTBXQkQk/main2.png" bgColor="bg-transparent" className="!h-auto" />
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-40 pb-20 mt-10 px-4 md:px-8">
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            char={char}
          />
        ))}
      </div>
    </div>
  );
}

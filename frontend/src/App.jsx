import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Stars, ArrowRight, Camera } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [noHoverCount, setNoHoverCount] = useState(0);

  // Example placeholder images (the user will replace these later)
  const photos = [
    '/images/media__1772812131058.jpg',
    '/images/media__1772812131075.jpg',
    '/images/media__1772812131090.jpg',
    '/images/media__1772812131103.jpg',
    '/images/media__1772812131112.jpg',
    '/images/media__1772812518452.jpg',
    '/images/media__1772812518465.jpg',
    '/images/media__1772812518474.jpg',
    '/images/media__1772812518555.jpg',
    '/images/media__1772812518564.jpg',
    '/images/media__1772813476862.jpg',
    '/images/media__1772813476864.jpg'
  ];

  const moveNoButton = () => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 100;
    
    // Calculate random position within viewport bounds
    const randomX = Math.max(20, Math.floor(Math.random() * maxX - maxX/2));
    const randomY = Math.max(20, Math.floor(Math.random() * maxY - maxY/2));
    
    setNoPosition({ x: randomX, y: randomY });
    setNoHoverCount(prev => prev + 1);
  };

  const submitAnswer = async (answer) => {
    setIsLoading(true);
    try {
      await fetch('http://localhost:3000/api/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer, timestamp: new Date().toISOString() })
      });
    } catch (error) {
      console.error('Failed to submit answer:', error);
    } finally {
      setIsLoading(false);
      setHasAnswered(true);
    }
  };

  const renderWelcome = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center text-center p-8 glass rounded-3xl max-w-lg mx-auto shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-red-400 to-pink-400"></div>
      
      <motion.div 
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <Heart className="w-20 h-20 text-red-500 mb-6 drop-shadow-lg" fill="currentColor" />
      </motion.div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600">
        Мартын 8-ны Мэнд Хүргэе! 🌷
      </h1>
      
      <p className="text-lg md:text-xl text-gray-700 mb-8 font-medium leading-relaxed">
        Хайртдаа зориулан энэхүү бяцхан гэнэтийн бэлгээ бэлдлээ. 
        Өнөөдөр чиний өдөр шүү! ✨
      </p>

      <button 
        onClick={() => setStep(1)}
        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-pink-500 to-red-500 rounded-full hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 shadow-xl hover:shadow-pink-500/50 hover:-translate-y-1"
      >
        <span>Цааш үзэх</span>
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );

  const renderGallery = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center text-center p-4 md:p-8 w-full max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-center gap-3 mb-8 relative z-10 bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full mt-10">
        <Camera className="w-8 h-8 text-pink-500" />
        <h2 className="text-3xl md:text-4xl font-bold text-pink-700 font-serif">Бидний дурсамжууд</h2>
      </div>

      <p className="text-pink-600 mb-8 font-medium relative z-10 bg-white/70 px-4 py-2 rounded-xl backdrop-blur-md font-bold shadow-sm">
        (Бидний хамгийн нандин мөчүүд ✨)
      </p>

      <div className="absolute inset-0 pointer-events-none overflow-visible h-[100vh] w-full flex flex-wrap items-end justify-center z-0">
        {/* Decorative background hearts */}
        {[...Array(10)].map((_, i) => (
          <Heart 
            key={`bg-heart-${i}`}
            className="absolute text-pink-400 opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
              animation: `float-around-${Math.floor(Math.random() * 3) + 1} ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
            fill="currentColor"
          />
        ))}

        {photos.map((src, idx) => {
          // Generate deterministic random-like values for each photo
          const leftPos = (idx * 20 + 10) % 90; // Spread across width
          const animDelay = idx * 1.5; // Stagger start times
          const animDuration = 12 + (idx % 3) * 3; // Vary speeds
          const animName = `float-around-${(idx % 3) + 1}`; // Vary animations
          
          // Random shape assignment
          const shapes = ['heart-shape', 'circle-shape', 'star-shape', 'rounded-shape'];
          const shapeClass = shapes[idx % shapes.length];

          return (
            <div 
              key={idx}
              className="absolute bottom-[-20%] w-32 h-32 md:w-48 md:h-48"
              style={{
                left: `${leftPos}%`,
                animation: `${animName} ${animDuration}s linear infinite`,
                animationDelay: `${animDelay}s`,
                opacity: 0
              }}
            >
              <div className={`${shapeClass} w-full h-full bg-pink-300 p-1 drop-shadow-xl overflow-hidden`}>
                <img 
                  src={src} 
                  alt="Memory" 
                  className={`${shapeClass} w-full h-full object-cover scale-110`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex-1 mt-[50vh]"></div>

      <button 
        onClick={() => setStep(2)}
        className="group relative z-20 inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-red-500 to-pink-500 rounded-full hover:scale-105 shadow-xl hover:shadow-red-500/30 w-full max-w-sm mb-10"
      >
        <span>Үргэлжлүүлэх</span>
        <Stars className="w-5 h-5 ml-2 animate-pulse" />
      </button>
    </motion.div>
  );

  const renderLetter = () => (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center text-center p-6 md:p-10 glass rounded-3xl max-w-3xl mx-auto shadow-2xl relative"
    >
       <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-90 border-b border-red-700 shadow-md"></div>
       <div className="absolute top-1/2 left-4 w-4 h-4 bg-gray-800 rounded-full opacity-30 blur-[1px]"></div>
       <div className="absolute top-1/2 right-4 w-4 h-4 bg-gray-800 rounded-full opacity-30 blur-[1px]"></div>
       
       <motion.div 
        initial={{ rotate: -2, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-left font-serif text-gray-800 leading-[2rem] mt-2 space-y-1 mb-6 text-xl md:text-2xl paper-bg p-6 md:p-8 rounded-sm shadow-2xl relative w-full overflow-hidden border border-amber-100"
       >
         {/* Vertical paper margin line */}
         <div className="absolute top-0 left-[2.5rem] md:left-[3.5rem] w-0.5 h-full bg-red-400 opacity-50"></div>
         <div className="absolute top-0 left-[2.7rem] md:left-[3.7rem] w-[1px] h-full bg-red-400 opacity-30"></div>
         
         <div className="pl-[2rem] md:pl-[3rem] pr-4 mt-2 mb-2 w-full text-left">
           <p className="font-bold text-pink-700 text-xl md:text-2xl mb-2">
             Миний хамгийн нандин, хөөрхөн хайрт минь,
           </p>
           <p className="text-gray-800 font-medium text-lg md:text-xl">
             Чамтайгаа өнгөрүүлсэн хором мөч бүхэн миний амьдралын хамгийн гэрэлтэй, хамгийн жаргалтай өдрүүд байдаг шүү. Чиний минь инээмсэглэл намайг үргэлж дулаацуулж, чиний л дэргэд би хамгийн өөрийнхөөрөө, хамгийн жаргалтай нэгэн байж чаддаг.
           </p>
           <p className="text-gray-800 font-medium text-lg md:text-xl mt-2">
             Чи миний хувьд хамгийн нандин, хамгийн чухал хүн минь юм шүү. Чигүйгээр нэг ч өдрийг төсөөлж чадахгүй нь. Бидний хамтдаа өнгөрүүлсэн дурсамжууд миний сэтгэлд хамгийн тодоор гэрэлтэж байдаг.
           </p>
           <p className="text-gray-800 font-medium text-lg md:text-xl mt-2">
             Цаашдаа ч гэсэн энэ олон сайхан дурсамжуудаа үргэлжлүүлэн хамтдаа бүтээж, үргэлж чамайгаа хайрлаж, халамжлах болно оо. Мартын 8-ны мэнд хүргэе хайраа! Бусад өдрүүдэд ч гэсэн би чамайг үргэлж баярлуулж байх болно.
           </p>
           <p className="font-bold text-pink-800 mt-6 text-right text-xl">
             Чамд хязгааргүй их хайртай,<br/>
             Таны хайр ❤️
           </p>
         </div>
       </motion.div>

       <button 
        onClick={() => setStep(3)}
        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-red-500 to-pink-500 rounded-full hover:scale-105 shadow-xl hover:shadow-red-500/30"
      >
        <span>Тэгээд нэг зүйл асуух гэсэн юм...</span>
        <Heart className="w-5 h-5 ml-2 animate-bounce" />
      </button>
    </motion.div>
  );

  const renderQuestion = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center p-8 glass rounded-3xl max-w-lg mx-auto shadow-2xl relative"
    >
      {!hasAnswered ? (
        <>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Heart className="w-24 h-24 text-red-500 mb-6 drop-shadow-xl" fill="currentColor" />
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600 leading-tight">
            Надтай болзоонд явах уу? 🥺
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full relative h-[200px] sm:h-auto">
            <button 
              onClick={() => submitAnswer('yes')}
              disabled={isLoading}
              className="px-10 py-5 font-bold text-xl text-white bg-gradient-to-r from-green-400 to-emerald-500 rounded-full hover:scale-110 shadow-lg hover:shadow-green-500/50 transition-all z-20"
            >
              Тэгье ❤️
            </button>
            
            {noHoverCount < 4 && (
              <motion.button 
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                animate={{ 
                  x: noPosition.x, 
                  y: noPosition.y 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute px-10 py-5 font-bold text-xl text-gray-700 bg-gray-200 rounded-full shadow hover:bg-red-100 whitespace-nowrap z-10"
                style={{ 
                  left: noPosition.x ? noPosition.x : '50%', 
                  top: noPosition.y ? noPosition.y : 'auto',
                  transform: noPosition.x ? 'none' : 'translateX(100px)' 
                }} 
              >
                Үгүй 💔
              </motion.button>
            )}
          </div>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center glass p-8 md:p-12 rounded-3xl"
        >
          <div className="relative mb-6">
            <Heart className="w-24 h-24 text-red-500 absolute animate-ping opacity-20" fill="currentColor" />
            <Heart className="w-24 h-24 text-red-500 relative z-10 animate-pulse-heart" fill="currentColor" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-6 font-serif">Еэээ! 🎉</h2>
          <p className="text-xl md:text-2xl text-gray-800 font-medium mb-8">Миний гүнж зөвшөөрсөнд маш их баяртай байна! ❤️</p>
          
          <div className="bg-white/60 p-6 rounded-2xl w-full text-left space-y-4 shadow-sm border border-pink-200">
            <h3 className="text-2xl font-bold text-pink-600 mb-4 border-b border-pink-200 pb-2">Бидний болзооны төлөвлөгөө:</h3>
            <div className="flex items-center gap-4 text-lg text-gray-700">
              <span className="bg-pink-100 p-2 rounded-full"><Stars className="w-6 h-6 text-pink-500"/></span>
              <p><b>12:00 Цагт:</b> Би өөрөө очиж авна 🚗</p>
            </div>
            <div className="flex items-center gap-4 text-lg text-gray-700">
              <span className="bg-pink-100 p-2 rounded-full"><Heart className="w-6 h-6 text-pink-500"/></span>
              <p>Хамтдаа кино үзэж, амттай хоол иднэ 🍿🍽️</p>
            </div>
          </div>
          
          <p className="text-lg text-pink-500 font-bold mt-8 animate-pulse">Удахгүй уулзъя хайраа! ✨</p>
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-rose-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 w-full">
        {step === 0 && renderWelcome()}
        {step === 1 && renderGallery()}
        {step === 2 && renderLetter()}
        {step === 3 && renderQuestion()}
      </div>
    </div>
  );
}

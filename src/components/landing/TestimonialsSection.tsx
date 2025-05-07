
const testimonials = [
  {
    quote: "SkyBound has transformed how I track my flights. The interface is intuitive and the statistics help me keep track of my progress toward ATP.",
    author: "Captain Sarah Johnson",
    role: "Commercial Pilot"
  },
  {
    quote: "As a flight instructor, I need to keep precise records. SkyBound makes it easy to log every student flight and track my teaching hours.",
    author: "Michael Rodriguez",
    role: "CFI, CFII"
  },
  {
    quote: "The PDF export feature saved me hours when applying for my first airline job. My logbook looked professional and was accepted without question.",
    author: "David Chen",
    role: "First Officer"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-navy-700 text-white">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">What Pilots Are Saying</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Don't just take our word for it - hear from pilots who use SkyBound every day.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-navy-800/50 border border-white/10 rounded-lg p-6 relative"
            >
              <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-4 text-6xl text-accent/50">
                "
              </div>
              <p className="mb-6 text-white/90 relative z-10">{testimonial.quote}</p>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-white/70 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

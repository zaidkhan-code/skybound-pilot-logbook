export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              About SkyBound
            </h2>
            <p className="text-lg mb-4">
              SkyBound was created by pilots who understand the challenges of
              maintaining accurate flight records. We've experienced the
              frustration of paper logbooks and inadequate digital solutions
              firsthand.
            </p>
            <p className="text-lg mb-4">
              Our mission is to provide pilots with the most intuitive,
              comprehensive, and reliable logbook solution available. Whether
              you're a student pilot just starting your journey or an
              experienced captain with thousands of hours, SkyBound is designed
              to meet your needs.
            </p>
            <p className="text-lg">
              With a focus on user experience, data security, and regulatory
              compliance, we're committed to helping pilots around the world
              track their aviation career with confidence.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
            <img
              src="/download (1).jpeg"
              alt="Pilots using SkyBound"
              className="w-full h-auto rounded-xl shadow-lg relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

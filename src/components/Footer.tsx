import AdSenseSlot from "@/components/AdSenseSlot";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-16">
      {/* AdSense placeholder — footer leaderboard (728x90) */}
      <div className="flex justify-center py-4">
        <AdSenseSlot slotId="footer-leaderboard" width={728} height={90} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} FlashVault. Preserving Flash games for
            future generations.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Powered by Ruffle</span>
            <span>•</span>
            <span>Games from Internet Archive</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

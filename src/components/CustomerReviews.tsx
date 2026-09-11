import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, CheckCircle, MessageSquarePlus, Filter, X, Award } from 'lucide-react';
import { INITIAL_REVIEWS, BUSINESS_INFO } from '../data/salonData';
import { ReviewItem } from '../types';

export const CustomerReviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('luxstudio_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed parsing local reviews', e);
      }
    }
    return INITIAL_REVIEWS;
  });

  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [helpfulMap, setHelpfulMap] = useState<Record<string, boolean>>({});
  const [showWriteModal, setShowWriteModal] = useState(false);

  // New review form states
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newService, setNewService] = useState('Signature Balayage & Glossing');
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem('luxstudio_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleHelpfulToggle = (reviewId: string) => {
    if (helpfulMap[reviewId]) return; // already voted

    setHelpfulMap((prev) => ({ ...prev, [reviewId]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    setSubmittingReview(true);

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      avatar: `https://images.unsplash.com/photo-${1534528741775 + (reviews.length % 10)}?auto=format&fit=crop&w=160&q=80`,
      rating: newRating,
      date: 'Just now',
      service: newService,
      comment: newComment.trim(),
      verified: true,
      helpfulCount: 0,
    };

    setTimeout(() => {
      setReviews([newRev, ...reviews]);
      setSubmittingReview(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowWriteModal(false);
        setNewAuthor('');
        setNewComment('');
      }, 1500);
    }, 400);
  };

  const filteredReviews = filterRating === 'all'
    ? reviews
    : reviews.filter((r) => r.rating === filterRating);

  return (
    <section id="reviews" className="py-20 bg-white border-t border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wider uppercase mb-3">
              <Award className="w-3.5 h-3.5" />
              Client Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Customer Reviews
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-xl">
              Discover verified reviews from guests who trust Luxstudio for their hair transformation, skincare, and beauty rituals.
            </p>
          </div>

          {/* Write a Review Button */}
          <button
            id="open-write-review-btn"
            onClick={() => setShowWriteModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold transition-all shadow-xs self-start md:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4 text-amber-400" />
            Write a Review
          </button>
        </div>

        {/* Rating Breakdown Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center bg-stone-50/80 rounded-2xl p-6 sm:p-8 border border-stone-200">
          {/* Big Score Block */}
          <div className="lg:col-span-4 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-stone-200 pb-6 lg:pb-0 lg:pr-8">
            <div className="text-5xl sm:text-6xl font-serif font-bold text-stone-900">4.9</div>
            <div className="flex items-center justify-center lg:justify-start gap-1 mt-2 text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-stone-500 mt-2 font-medium">
              Based on 138+ Google verified guest reviews
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-medium border border-emerald-200/60">
              <CheckCircle className="w-3.5 h-3.5" />
              98% of clients rebook within 6 weeks
            </div>
          </div>

          {/* Bar Chart Distribution */}
          <div className="lg:col-span-5 space-y-2">
            {[
              { stars: 5, pct: 93, count: 128 },
              { stars: 4, pct: 5, count: 7 },
              { stars: 3, pct: 2, count: 3 },
              { stars: 2, pct: 0, count: 0 },
              { stars: 1, pct: 0, count: 0 },
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-stone-600 font-medium flex items-center gap-1">
                  {row.stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
                </span>
                <div className="flex-1 h-2 rounded-full bg-stone-200 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-stone-500">{row.pct}%</span>
              </div>
            ))}
          </div>

          {/* Highlight Perks */}
          <div className="lg:col-span-3 space-y-2 text-xs text-stone-700 border-t lg:border-t-0 pt-6 lg:pt-0">
            <div className="font-semibold text-stone-900 mb-1">Guests Frequently Praise:</div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Attentive consultation & custom hair mapping
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Immaculately clean and soothing space
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Long-lasting BIAB nails & gentle removals
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-stone-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Filter by stars:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setFilterRating('all')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  filterRating === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All ({reviews.length})
              </button>
              {[5, 4].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setFilterRating(stars)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    filterRating === stars
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {stars} Stars
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-stone-500">
            Showing {filteredReviews.length} reviews
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-stone-50/50 rounded-2xl p-6 border border-stone-200 flex flex-col justify-between hover:border-stone-300 transition-all hover:shadow-xs"
            >
              <div>
                {/* Author Info & Rating */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-10 h-10 rounded-full object-cover border border-stone-300"
                      onError={(e) => {
                        // Fallback avatar
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900 leading-tight">
                        {review.author}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] text-stone-500">{review.date}</span>
                        {review.verified && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 font-medium">
                            • Verified Guest
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Treatment Tag */}
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium mb-3">
                  Service: {review.service}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              {/* Helpful footer */}
              <div className="mt-5 pt-3 border-t border-stone-200/70 flex items-center justify-between text-xs text-stone-500">
                <span>Was this review helpful?</span>
                <button
                  onClick={() => handleHelpfulToggle(review.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                    helpfulMap[review.id]
                      ? 'text-emerald-700 bg-emerald-50 font-medium'
                      : 'hover:bg-stone-200/60 text-stone-600'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{review.helpfulCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Write a Review */}
        {showWriteModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 backdrop-blur-xs p-4 animate-in fade-in"
            onClick={() => setShowWriteModal(false)}
          >
            <div
              className="relative max-w-lg w-full bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-stone-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">Share Your Experience</h3>
                  <p className="text-xs text-stone-500 mt-0.5">Your feedback supports our London artisans</p>
                </div>
                <button
                  onClick={() => setShowWriteModal(false)}
                  className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-stone-900">Thank You!</h4>
                  <p className="text-sm text-stone-600 mt-1">Your review has been posted to our page.</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="p-1 focus:outline-hidden"
                        >
                          <Star
                            className={`w-7 h-7 transition-colors ${
                              star <= newRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-stone-500 ml-2 font-medium">
                        {newRating === 5 ? 'Exceptional (5/5)' : `${newRating} Stars`}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jessica Sterling"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Service Received
                    </label>
                    <select
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 bg-white"
                    >
                      <option value="Signature Balayage & Glossing">Signature Balayage & Glossing</option>
                      <option value="Precision Cut & Luxury Blowdry">Precision Cut & Luxury Blowdry</option>
                      <option value="HydraGlow Deluxe Clinical Facial">HydraGlow Deluxe Clinical Facial</option>
                      <option value="BIAB Builder Gel Overlay">BIAB Builder Gel Overlay</option>
                      <option value="Russian Volume Lash Extensions">Russian Volume Lash Extensions</option>
                      <option value="Deep Relief Aromatherapy Massage">Deep Relief Aromatherapy Massage</option>
                    </select>
                  </div>

                  {/* Review text */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Your Comments
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share details about your stylist, the results, and the ambiance..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors shadow-xs"
                  >
                    {submittingReview ? 'Submitting...' : 'Post Verified Review'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

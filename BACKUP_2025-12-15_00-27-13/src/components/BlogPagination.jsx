
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BlogPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="border-white/10 hover:bg-white/5 hover:text-[#BFA76A]"
      >
        <ChevronLeft size={16} />
      </Button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'outline'}
          onClick={() => onPageChange(page)}
          className={currentPage === page 
            ? 'bg-[#BFA76A] text-black font-bold border-[#BFA76A]' 
            : 'border-white/10 hover:bg-white/5 text-gray-400'
          }
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="border-white/10 hover:bg-white/5 hover:text-[#BFA76A]"
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default BlogPagination;

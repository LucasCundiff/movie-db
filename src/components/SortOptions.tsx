import React from 'react';

interface SortOptionsProps {
  onSort: (sortOption: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ onSort }) => {
  return (
    <select onChange={(e) => onSort(e.target.value)}>
      <option value="rating-asc">Lowest Rating</option>
      <option value="rating-desc">Highest Rating</option>
      <option value="title-asc">Alphabetical</option>
      <option value="title-desc">Alphabetical-Reverse</option>
      <option value="year-asc">Release Year Ascending</option>
      <option value="year-desc">Release Year Descending</option>
    </select>
  );
};

export default SortOptions;

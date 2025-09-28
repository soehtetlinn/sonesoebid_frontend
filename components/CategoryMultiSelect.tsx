import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface CategoryMultiSelectProps {
  selectedCategories: string[];
  onCategoriesChange: (categoryIds: string[]) => void;
  placeholder?: string;
}

const CategoryMultiSelect: React.FC<CategoryMultiSelectProps> = ({
  selectedCategories,
  onCategoriesChange,
  placeholder = "Select categories..."
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const fetchedCategories = await api.getCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoriesChange(selectedCategories.filter(id => id !== categoryId));
    } else {
      onCategoriesChange([...selectedCategories, categoryId]);
    }
  };

  const removeCategory = (categoryId: string) => {
    onCategoriesChange(selectedCategories.filter(id => id !== categoryId));
  };

  const getSelectedCategories = () => {
    return categories.filter(cat => selectedCategories.includes(cat.id));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected Categories Display */}
      <div className="min-h-[38px] border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 p-2 flex flex-wrap gap-2 items-center">
        {getSelectedCategories().map(category => (
          <span
            key={category.id}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-brand-blue text-white"
          >
            {category.name}
            <button
              type="button"
              onClick={() => removeCategory(category.id)}
              className="ml-2 text-white hover:text-gray-200 focus:outline-none"
            >
              ×
            </button>
          </span>
        ))}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 text-left text-gray-500 dark:text-gray-400 py-1 px-2 focus:outline-none"
          placeholder={placeholder}
        >
          {getSelectedCategories().length === 0 ? placeholder : ''}
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-600">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search categories..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Category List */}
          <div className="py-1">
            {loading ? (
              <div className="px-4 py-2 text-gray-500 dark:text-gray-400 text-center">
                Loading categories...
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="px-4 py-2 text-gray-500 dark:text-gray-400 text-center">
                {searchTerm ? 'No categories found' : 'No categories available'}
              </div>
            ) : (
              filteredCategories.map(category => (
                <label
                  key={category.id}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="mr-3 h-4 w-4 text-brand-blue focus:ring-brand-blue border-gray-300 dark:border-gray-600 rounded"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {category.name}
                    </div>
                    {category.description && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {category.description}
                      </div>
                    )}
                  </div>
                </label>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryMultiSelect;

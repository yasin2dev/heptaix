"use client"

import React from 'react'
import Link from 'next/link'

import { FiTag } from 'react-icons/fi';


const cards = [
  { title: 'Categories', action: openCategoriesModal, icon: FiTag, key: 'categories' },
];

export default function TagsPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className={`grid grid-cols-${cards.length <= 1 ? 1 : 3} gap-6 p-8`}>
        {cards.map((card) => (
          <div key={card.key}>
            <button
              className="bg-card shadow rounded-lg p-8 flex flex-col items-center justify-center hover:bg-accent transition cursor-pointer border border-border w-full"
              onClick={card.action}
            >
              {card.icon && <card.icon />}
              <span className="text-lg font-semibold pt-1">
                {card.title}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function openCategoriesModal() {
  alert("Tags Modal")
}
import React from "react";

function PostCard({ post }) {
  const { body, reactions, title } = post;
  const reaction = ["🤣", "😝", "😝", "🥰", "🥹", "😘", "🥺", "😭", "😠", "😤"];

  return (
    <div class="relative block overflow-hidden rounded-lg border border-gray-100 p-2 sm:p-2 lg:p-2 bg-gradient-to-r from-pink-300 to-blue-300 h-72">
      <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div class="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 class="text-lg font-bold text-gray-900 sm:text-xl">{title}</h3>
        </div>
      </div>

      <div class="mt-4">
        <p class="text-pretty text-sm text-gray-500 ">{body}</p>
      </div>

      <dl class="mt-6 flex gap-4 sm:gap-6">
        <div class="flex flex-col">
          <span class="text-sm font-medium text-gray-600">Reactions:</span>
          <span class="text-2xl text-gray-500 ">{reaction[reactions]}</span>
        </div>
      </dl>
    </div>
  );
}

export default PostCard;

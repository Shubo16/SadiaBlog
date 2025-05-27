import React from 'react';

function BlogAuthorAvatar({ src }) {
  return (
    <div>
      <img
        src={src}
        className=' w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover bg-center'
        alt="blog author avatar"
      />
    </div>
  );
}

export default BlogAuthorAvatar;

import React from "react";

interface BreadcrumbsProps {
  items: Array<{
    label: string;
    active?: boolean;
  }>;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav
      className="flex items-center gap-2 text-xs text-[rgba(17,110,238,1)] font-normal flex-wrap max-md:max-w-full"
      aria-label="Breadcrumbs"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/231403ce72a99c921a181dd36497d4c52f967fb8?placeholderIfAbsent=true"
        className="aspect-[1] object-contain w-3 self-stretch shrink-0 my-auto"
        alt="Home"
      />
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a61b8aff1f9a4d4b8c540558ab06b276/b8ea2fd049215bd10103d2cf8c5b3b52a07f76e7?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-3 self-stretch shrink-0 my-auto"
            alt="Separator"
            aria-hidden="true"
          />
          <div
            className={`self-stretch my-auto ${item.active ? 'text-[#252B2F]' : ''}`}
          >
            {item.label}
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;

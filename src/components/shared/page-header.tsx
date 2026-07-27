import type { ReactNode } from "react";
import Link from "next/link";

import { PageTitle } from "@/components/shared/typography";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export type PageHeaderCrumb = {
  label: string;
  href?: string;
};

export type PageHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs?: PageHeaderCrumb[];
  primaryAction?: ReactNode;
  secondaryActions?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  breadcrumbs,
  primaryAction,
  secondaryActions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <span key={crumb.label} className="flex items-center gap-1.5">
                  <BreadcrumbItem>
                    {isLast || !crumb.href ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink render={<Link href={crumb.href} />}>
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </span>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <PageTitle>{title}</PageTitle>
          {description ? (
            <p className="text-muted-foreground max-w-2xl text-sm">{description}</p>
          ) : null}
        </div>
        {(primaryAction || secondaryActions) && (
          <div className="flex shrink-0 items-center gap-2">
            {secondaryActions}
            {primaryAction}
          </div>
        )}
      </div>
    </div>
  );
}

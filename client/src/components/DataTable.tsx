import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Pencil, Trash2 } from "lucide-react";

export interface TableColumn {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface TableAction {
  icon: "view" | "edit" | "delete";
  label: string;
  onClick: (row: any) => void;
}

interface DataTableProps {
  title: string;
  description?: string;
  columns: TableColumn[];
  data: any[];
  actions?: TableAction[];
}

export default function DataTable({ title, description, columns, data, actions }: DataTableProps) {
  const actionIcons = {
    view: Eye,
    edit: Pencil,
    delete: Trash2
  };

  return (
    <Card data-testid="card-datatable">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="text-left p-3 text-sm font-medium text-muted-foreground"
                  >
                    {col.label}
                  </th>
                ))}
                {actions && actions.length > 0 && (
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="text-center p-8 text-sm text-muted-foreground"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b last:border-0 hover-elevate"
                    data-testid={`row-${rowIndex}`}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="p-3 text-sm">
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                    {actions && actions.length > 0 && (
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          {actions.map((action, actionIndex) => {
                            const Icon = actionIcons[action.icon];
                            return (
                              <Button
                                key={actionIndex}
                                variant="ghost"
                                size="icon"
                                onClick={() => action.onClick(row)}
                                title={action.label}
                                data-testid={`button-${action.icon}-${rowIndex}`}
                              >
                                <Icon className="h-4 w-4" />
                              </Button>
                            );
                          })}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

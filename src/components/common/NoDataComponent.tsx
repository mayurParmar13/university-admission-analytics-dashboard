interface INoDataComponent {
  title?: string;
  subtitle?: string;
}

const NoDataComponent = ({
  title = "No data available",
  subtitle = "There is no data to display.",
}: INoDataComponent) => {
  return (
    <div className="flex h-80 items-center justify-center rounded-xl border border-dashed border-border">
      <div className="px-4 text-center">
        <p className="text-sm font-medium text-slate-700">{title}</p>
        <p className="mt-1 text-sm text-secondary">{subtitle}</p>
      </div>
    </div>
  );
};

export default NoDataComponent;

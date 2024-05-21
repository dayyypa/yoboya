export function cls(...classnames: (string | undefined)[]) {
	return classnames.filter((name) => !!name).join(' ');
}
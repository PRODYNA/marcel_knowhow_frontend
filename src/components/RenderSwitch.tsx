import React from 'react';

type RenderSwitchProps = {
	render: boolean;
	children?: React.ReactNode;
}

const RenderSwitch: React.FC<RenderSwitchProps> = ( { render, children }) => {
	return render ? <>{children}</> : null;
}

export default RenderSwitch

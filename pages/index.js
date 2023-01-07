//import Sidebar from "../components/sidebar"

export default function Page() {
	return (
		<>
			<div class="grid place-items-center mt-14">
				<div className="stats shadow">
					<div className="stat place-items-center">
						<div className="stat-value">Toaster</div>
						<div className="stat-desc">cooper@eglo.pw</div>
					</div>
				</div>
			</div>
			<div className="toast toast-end">
				<div className="alert alert-primary">
					<div>
						<span>Version: 0.0.1</span>
					</div>
				</div>
			</div>
		</>
	)
}

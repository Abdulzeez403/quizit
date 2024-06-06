
import { SidebarComponent } from "./mainLayout";

interface IProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: IProps) {

    return (
        <div>
            <SidebarComponent>
                <div className=' '>
                    {children}

                </div>
            </SidebarComponent>
        </div>
    );
}

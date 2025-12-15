import ChangeLang from '@/features/change-lang';
import ChangeTheme from '@/features/change-theme';
import { Logo } from '@/entities/brand';

const Header = () => {
    return (
        <header>
            <div className="container flex items-center justify-between gap-6 py-4">
                <Logo />

                <div className="flex items-center gap-4">
                    <ChangeTheme />

                    <ChangeLang />
                </div>
            </div>
        </header>
    );
};

export default Header;

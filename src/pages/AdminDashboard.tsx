import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Newspaper, Trophy, ArrowLeft, LogOut } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, username, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LayoutDashboard className="w-6 h-6 text-rose-600" />
            <h1 className="text-2xl font-bold text-gray-900">管理者ダッシュボード</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">こんにちは、{username}さん</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              ログアウト
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            サイトに戻る
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* News Management Card */}
          <div
            onClick={() => navigate('/admin/news')}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 cursor-pointer hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Newspaper className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">お知らせ管理</h2>
            <p className="text-gray-600 mb-4">お知らせの追加、編集、削除を行います</p>
            <div className="text-blue-600 font-medium group-hover:text-blue-700">
              管理ページへ →
            </div>
          </div>

          {/* Achievements Management Card */}
          <div
            onClick={() => navigate('/admin/achievements')}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 cursor-pointer hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-amber-100 p-3 rounded-lg group-hover:bg-amber-200 transition-colors">
                <Trophy className="w-8 h-8 text-amber-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">実績管理</h2>
            <p className="text-gray-600 mb-4">実績の追加、編集、削除を行います</p>
            <div className="text-amber-600 font-medium group-hover:text-amber-700">
              管理ページへ →
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

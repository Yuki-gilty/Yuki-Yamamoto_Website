import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Edit, Trash2, ArrowLeft, LogOut } from 'lucide-react';
import api from '../utils/api';
import NewsForm from '../components/admin/NewsForm';

interface NewsItem {
  id: number;
  date: string;
  title_ja: string;
  title_en: string;
  content_ja: string;
  content_en: string;
  image_url?: string;
}

const AdminNews: React.FC = () => {
  const { isAuthenticated, username, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | undefined>();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNews();
    }
  }, [isAuthenticated]);

  const fetchNews = async () => {
    try {
      const response = await api.get('/news');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoadingNews(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('このお知らせを削除しますか？')) return;

    setDeletingId(id);
    try {
      await api.delete(`/news/${id}`);
      setNews(news.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('削除に失敗しました');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading || loadingNews) {
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
            <button
              onClick={() => navigate('/admin')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">お知らせ管理</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{username}さん</span>
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
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">お知らせの追加、編集、削除を行います</p>
          <button
            onClick={() => {
              setEditingNews(undefined);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            お知らせを追加
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {news.length === 0 ? (
              <div className="p-8 text-center text-gray-500">お知らせがありません</div>
            ) : (
              news.map((item) => (
                <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-sm text-gray-500">
                          {new Date(item.date).toLocaleDateString('ja-JP')}
                        </span>
                        {item.image_url && (
                          <span className="text-xs text-gray-400">画像あり</span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title_ja}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{item.content_ja}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => {
                          setEditingNews(item);
                          setShowForm(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {showForm && (
        <NewsForm
          news={editingNews}
          onClose={() => {
            setShowForm(false);
            setEditingNews(undefined);
          }}
          onSuccess={fetchNews}
        />
      )}
    </div>
  );
};

export default AdminNews;

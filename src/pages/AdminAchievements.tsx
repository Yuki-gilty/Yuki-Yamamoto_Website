import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Edit, Trash2, ArrowLeft, LogOut } from 'lucide-react';
import api from '../utils/api';
import AchievementForm from '../components/admin/AchievementForm';

interface Achievement {
  id: number;
  year: string;
  text_ja: string;
  text_en: string;
}

const AdminAchievements: React.FC = () => {
  const { isAuthenticated, username, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState<Record<string, Achievement[]>>({});
  const [loadingAchievements, setLoadingAchievements] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | undefined>();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAchievements();
    }
  }, [isAuthenticated]);

  const fetchAchievements = async () => {
    try {
      const response = await api.get('/achievements');
      setAchievements(response.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoadingAchievements(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('この実績を削除しますか？')) return;

    setDeletingId(id);
    try {
      await api.delete(`/achievements/${id}`);
      fetchAchievements();
    } catch (error) {
      console.error('Error deleting achievement:', error);
      alert('削除に失敗しました');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading || loadingAchievements) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const sortedYears = Object.keys(achievements).sort((a, b) => parseInt(b) - parseInt(a));

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
            <h1 className="text-2xl font-bold text-gray-900">実績管理</h1>
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
          <p className="text-gray-600">実績の追加、編集、削除を行います</p>
          <button
            onClick={() => {
              setEditingAchievement(undefined);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            実績を追加
          </button>
        </div>

        <div className="space-y-6">
          {sortedYears.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
              実績がありません
            </div>
          ) : (
            sortedYears.map((year) => (
              <div key={year} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">{year}年</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {achievements[year].map((achievement) => (
                    <div key={achievement.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-gray-900 mb-1">{achievement.text_ja}</p>
                          <p className="text-sm text-gray-600">{achievement.text_en}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => {
                              setEditingAchievement(achievement);
                              setShowForm(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(achievement.id)}
                            disabled={deletingId === achievement.id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {showForm && (
        <AchievementForm
          achievement={editingAchievement}
          onClose={() => {
            setShowForm(false);
            setEditingAchievement(undefined);
          }}
          onSuccess={fetchAchievements}
        />
      )}
    </div>
  );
};

export default AdminAchievements;

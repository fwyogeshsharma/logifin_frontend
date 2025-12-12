// src/pages/SuperAdminDashboard/SuperAdminDashboard.tsx

import { memo, useState, useCallback, useEffect, useMemo } from 'react';
import { DashboardLayout, type NavSection } from '@/components/layout';
import { usersService, type User, type CreateUserRequest } from '@/services/users';
import { rolesService, type Role } from '@/services/roles';
import { ROUTES } from '@/config/routes';
import styles from './SuperAdminDashboard.module.css';

// Icons
const DashboardIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
);

const UsersIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BuildingIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 21h18" />
    <path d="M5 21V7l8-4v18" />
    <path d="M19 21V11l-6-4" />
  </svg>
);

const TruckIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 3h15v13H1z" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const SettingsIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const TrashIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const EditIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const PlusIcon = (): JSX.Element => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// Helper function to format role name
const formatRoleName = (user: { role?: string; roleName?: string } | string | undefined): string => {
  let roleName: string | undefined;

  // Handle different input types
  if (typeof user === 'string') {
    roleName = user;
  } else if (user && typeof user === 'object') {
    // Prefer roleName from API, fallback to role
    roleName = user.roleName || user.role;
  }

  if (!roleName) return 'No Role';

  // Remove ROLE_ prefix
  const withoutPrefix = roleName.replace('ROLE_', '');

  // Convert underscores to spaces and convert to title case
  return withoutPrefix
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const SuperAdminDashboard = memo(function SuperAdminDashboard(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createUserData, setCreateUserData] = useState<CreateUserRequest>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    roleId: 0,
    companyId: undefined,
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [createError, setCreateError] = useState<string>('');

  const navSections: NavSection[] = useMemo(
    () => [
      {
        title: 'Admin',
        items: [
          { path: ROUTES.SUPER_ADMIN_DASHBOARD, label: 'Dashboard', icon: <DashboardIcon /> },
          { path: ROUTES.SUPER_ADMIN_USERS, label: 'Users', icon: <UsersIcon /> },
          { path: ROUTES.SUPER_ADMIN_COMPANIES, label: 'Companies', icon: <BuildingIcon /> },
          { path: ROUTES.SUPER_ADMIN_TRIPS, label: 'Trips', icon: <TruckIcon /> },
        ],
      },
      {
        title: 'System',
        items: [
          { path: ROUTES.SETTINGS, label: 'Settings', icon: <SettingsIcon /> },
        ],
      },
    ],
    []
  );

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await usersService.getAllUsers();
      if (response.success && response.data) {
        const usersData = Array.isArray(response.data) ? response.data : [];
        setUsers(usersData);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchRoles = useCallback(async () => {
    try {
      const response = await rolesService.getRoles();
      if (response.success && response.data) {
        const rolesData = Array.isArray(response.data) ? response.data : [];
        setRoles(rolesData);
      } else {
        setRoles([]);
      }
    } catch (error) {
      console.error('Failed to fetch roles:', error);
      setRoles([]);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [fetchUsers, fetchRoles]);

  const handleEditUser = useCallback((user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  }, []);

  const handleDeleteUser = useCallback((user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  }, []);

  const handleRoleChange = useCallback(async (userId: number, roleId: number) => {
    try {
      const response = await usersService.updateUserRole(userId, roleId);
      if (response.success) {
        // Refresh users list
        fetchUsers();
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to update user role:', error);
    }
  }, [fetchUsers]);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedUser) return;

    try {
      const response = await usersService.deleteUser(selectedUser.id);
      if (response.success) {
        // Refresh users list
        fetchUsers();
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  }, [selectedUser, fetchUsers]);

  const handleCreateUser = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');

    // Validate password confirmation
    if (createUserData.password !== confirmPassword) {
      setCreateError('Passwords do not match');
      return;
    }

    // Validate password length
    if (createUserData.password.length < 6) {
      setCreateError('Password must be at least 6 characters');
      return;
    }

    try {
      console.log('Creating user with data:', {
        ...createUserData,
        password: '***HIDDEN***'
      });

      const response = await usersService.createUser(createUserData);

      console.log('Create user response:', response);

      if (response.success) {
        // Refresh users list
        fetchUsers();
        setIsCreateModalOpen(false);
        // Reset form
        setCreateUserData({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phone: '',
          roleId: 0,
          companyId: undefined,
        });
        setConfirmPassword('');
        setCreateError('');
      } else {
        setCreateError(response.message || 'Failed to create user');
      }
    } catch (error: any) {
      console.error('Failed to create user:', error);
      setCreateError(error?.response?.data?.message || error?.message || 'Failed to create user');
    }
  }, [createUserData, confirmPassword, fetchUsers]);

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const usersByRole = users.reduce((acc, user) => {
      const roleKey = user.roleName || user.role; // Use roleName from API, fallback to role
      if (roleKey) {
        acc[roleKey] = (acc[roleKey] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      totalUsers,
      totalLenders: usersByRole['ROLE_LENDER'] || 0,
      totalShippers: usersByRole['ROLE_SHIPPER'] || 0,
      totalTransporters: usersByRole['ROLE_TRANSPORTER'] || 0,
    };
  }, [users]);

  return (
    <DashboardLayout
      pageTitle="Super Admin Dashboard"
      navSections={navSections}
      roleLabel="Super Admin"
    >
      {/* Statistics */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <UsersIcon />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statValue}>{stats.totalUsers}</p>
            <p className={styles.statLabel}>Total Users</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <UsersIcon />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statValue}>{stats.totalLenders}</p>
            <p className={styles.statLabel}>Lenders</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <TruckIcon />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statValue}>{stats.totalTransporters}</p>
            <p className={styles.statLabel}>Transporters</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <BuildingIcon />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statValue}>{stats.totalShippers}</p>
            <p className={styles.statLabel}>Shippers</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>All Users</h2>
          <div className={styles.headerActions}>
            <button
              className={styles.createButton}
              onClick={() => setIsCreateModalOpen(true)}
            >
              <PlusIcon />
              Create User
            </button>
            <button className={styles.refreshButton} onClick={fetchUsers}>
              Refresh
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
            <p>Loading users...</p>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Company</th>
                  <th>Admin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{`${user.firstName || ''} ${user.lastName || ''}`}</td>
                    <td>{user.email || 'N/A'}</td>
                    <td>{user.phone || 'N/A'}</td>
                    <td>
                      <span className={styles.roleBadge}>
                        {formatRoleName(user)}
                      </span>
                    </td>
                    <td>{user.companyName || 'N/A'}</td>
                    <td>{user.isCompanyAdmin ? 'Yes' : 'No'}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.actionButton}
                          onClick={() => handleEditUser(user)}
                          title="Edit Role"
                        >
                          <EditIcon />
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDeleteUser(user)}
                          title="Delete User"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Role Modal */}
      {isEditModalOpen && selectedUser && (
        <>
          <div className={styles.modalBackdrop} onClick={() => setIsEditModalOpen(false)} />
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Edit User Role</h3>
              <button onClick={() => setIsEditModalOpen(false)} className={styles.closeButton}>
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>
                <strong>User:</strong> {selectedUser.firstName || ''} {selectedUser.lastName || ''}
              </p>
              <p>
                <strong>Current Role:</strong> {formatRoleName(selectedUser)}
              </p>
              <div className={styles.formGroup}>
                <label>Select New Role:</label>
                <select
                  className={styles.select}
                  defaultValue={selectedUser.roleName || selectedUser.role || ''}
                  onChange={(e) => {
                    const role = roles.find(r => r.roleName === e.target.value);
                    if (role) {
                      handleRoleChange(selectedUser.id, role.id);
                    }
                  }}
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.roleName}>
                      {formatRoleName(role.roleName)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedUser && (
        <>
          <div className={styles.modalBackdrop} onClick={() => setIsDeleteModalOpen(false)} />
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Confirm Delete</h3>
              <button onClick={() => setIsDeleteModalOpen(false)} className={styles.closeButton}>
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>Are you sure you want to delete this user?</p>
              <p>
                <strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p className={styles.warningText}>This action cannot be undone.</p>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.cancelButton}
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className={styles.confirmDeleteButton}
                onClick={handleConfirmDelete}
              >
                Delete User
              </button>
            </div>
          </div>
        </>
      )}

      {/* Create User Modal */}
      {isCreateModalOpen && (
        <>
          <div className={styles.modalBackdrop} onClick={() => setIsCreateModalOpen(false)} />
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Create New User</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className={styles.closeButton}>
                ×
              </button>
            </div>
            <form onSubmit={handleCreateUser}>
              <div className={styles.modalBody}>
                {createError && (
                  <div className={styles.errorMessage}>
                    {createError}
                  </div>
                )}
                <div className={styles.formGroup}>
                  <label>First Name *</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={createUserData.firstName}
                    onChange={(e) => setCreateUserData({ ...createUserData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Last Name *</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={createUserData.lastName}
                    onChange={(e) => setCreateUserData({ ...createUserData, lastName: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email *</label>
                  <input
                    type="email"
                    className={styles.input}
                    value={createUserData.email}
                    onChange={(e) => setCreateUserData({ ...createUserData, email: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Password * (minimum 6 characters)</label>
                  <input
                    type="password"
                    className={styles.input}
                    value={createUserData.password}
                    onChange={(e) => setCreateUserData({ ...createUserData, password: e.target.value })}
                    required
                    minLength={6}
                    placeholder="Enter password"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Confirm Password *</label>
                  <input
                    type="password"
                    className={styles.input}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Re-enter password"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone</label>
                  <input
                    type="tel"
                    className={styles.input}
                    value={createUserData.phone}
                    onChange={(e) => setCreateUserData({ ...createUserData, phone: e.target.value })}
                    placeholder="Optional"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Role *</label>
                  <select
                    className={styles.select}
                    value={createUserData.roleId}
                    onChange={(e) => setCreateUserData({ ...createUserData, roleId: parseInt(e.target.value) })}
                    required
                  >
                    <option value={0}>Select a role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {formatRoleName(role.roleName)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.createUserButton}
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </DashboardLayout>
  );
});

SuperAdminDashboard.displayName = 'SuperAdminDashboard';

export default SuperAdminDashboard;
